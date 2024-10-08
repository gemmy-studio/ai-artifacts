import { streamObject, LanguageModel, CoreMessage } from 'ai';

import ratelimit from '@/ai-artifacts/lib/ratelimit';
import { Templates, templatesToPrompt } from '@/ai-artifacts/lib/templates';
import { getModelClient, getDefaultMode } from '@/ai-artifacts/lib/models';
import { LLMModel, LLMModelConfig } from '@/ai-artifacts/lib/models';
import { artifactSchema as schema } from '@/ai-artifacts/lib/schema';

export const maxDuration = 60;

const rateLimitMaxRequests = 5;
const ratelimitWindow = '1m';

export async function POST(req: Request) {
  const limit = await ratelimit(req, rateLimitMaxRequests, ratelimitWindow);
  if (limit) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.amount.toString(),
        'X-RateLimit-Remaining': limit.remaining.toString(),
        'X-RateLimit-Reset': limit.reset.toString(),
      },
    });
  }

  const {
    messages,
    userID,
    template,
    model,
    config,
  }: {
    messages: CoreMessage[];
    userID: string;
    template: Templates;
    model: LLMModel;
    config: LLMModelConfig;
  } = await req.json();
  console.log('userID', userID);
  // console.log('template', template)
  console.log('model', model);
  console.log('config', config);

  const {
    model: modelNameString,
    apiKey: modelApiKey,
    ...modelParams
  } = config;
  const modelClient = getModelClient(model, config);

  const stream = await streamObject({
    model: modelClient as LanguageModel,
    schema,
    system: `You are a skilled software engineer. You do not make mistakes. Generate an artifact. You can install additional dependencies. You can use one of the following templates:\n${templatesToPrompt(template)}`,
    messages,
    mode: getDefaultMode(model),
    ...modelParams,
  });

  return stream.toTextStreamResponse();
}
