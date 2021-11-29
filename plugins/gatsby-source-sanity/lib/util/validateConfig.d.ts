import { PluginOptions, Reporter } from 'gatsby';
export interface PluginConfig extends PluginOptions {
    projectId: string;
    dataset: string;
    token?: string;
    version?: string;
    graphqlTag: string;
    overlayDrafts?: boolean;
    watchMode?: boolean;
    watchModeBuffer?: number;
}
export default function validateConfig(config: Partial<PluginConfig>, reporter: Reporter): config is PluginConfig;
