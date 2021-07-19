import ReteProvider from "./Rete";
import PubSubProvider from "./PubSub";
import SpellProvider from "./Spell";
import LayoutProvider from "./Layout";

const providers = [PubSubProvider, ReteProvider, SpellProvider, LayoutProvider];

function ComposeProviders({ providers, children }) {
  const _providers = [...providers].reverse();
  return _providers.reduce((acc, current) => {
    const [Provider, props] = Array.isArray(current)
      ? [current[0], current[1]]
      : [current, {}];

    return <Provider {...props}>{acc}</Provider>;
  }, children);
}

// Centralize all our providers to avoid nesting hell.
const WorkspaceProviders = ({ children }) => (
  <ComposeProviders providers={providers}>{children}</ComposeProviders>
);

export default WorkspaceProviders;