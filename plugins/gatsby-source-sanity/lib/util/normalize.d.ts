import { Actions, NodePluginArgs } from 'gatsby';
import { SanityDocument } from '../types/sanity';
import { TypeMap } from './remoteGraphQLSchema';
import { SanityInputNode } from '../types/gatsby';
export declare const RESTRICTED_NODE_FIELDS: string[];
export interface ProcessingOptions {
    typeMap: TypeMap;
    createNode: Actions['createNode'];
    createNodeId: NodePluginArgs['createNodeId'];
    createContentDigest: NodePluginArgs['createContentDigest'];
    createParentChildLink: Actions['createParentChildLink'];
    overlayDrafts: boolean;
}
export declare function toGatsbyNode(doc: SanityDocument, options: ProcessingOptions): SanityInputNode;
export declare function getTypeName(type: string): string;
export declare function getConflictFreeFieldName(fieldName: string): string;
