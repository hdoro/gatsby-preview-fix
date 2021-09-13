import { SourceNodesArgs } from 'gatsby';
import { SanityClient } from '@sanity/client';
import { SanityWebhookBody } from '../types/sanity';
import { ProcessingOptions } from './normalize';
export declare function handleWebhookEvent(args: SourceNodesArgs & {
    webhookBody?: SanityWebhookBody;
}, options: {
    client: SanityClient;
    processingOptions: ProcessingOptions;
}): Promise<boolean>;
export declare function validateWebhookPayload(payload: SanityWebhookBody | undefined): 'v1' | 'v2' | false;
