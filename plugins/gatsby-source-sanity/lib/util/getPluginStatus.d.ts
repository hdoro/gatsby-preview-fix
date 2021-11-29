import { SourceNodesArgs } from 'gatsby';
export default function getPluginStatus(args: SourceNodesArgs): any;
export declare function getLastBuildTime(args: SourceNodesArgs): Date | undefined;
export declare function registerBuildTime(args: SourceNodesArgs): Promise<void>;
