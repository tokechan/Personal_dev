import { ActionPanel, Detail, List, Action, Icon } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        icon={Icon.Bird}
        title="Greeting"
        actions={
          <ActionPanel>
            <Action.Push title="Show Detail1" target={<Detail markdown="# Hey! 👋" />} />
            <Action.Push title="Show List" target={<List />} />
            <Action.Push title="Show Detail2" target={<Detail markdown="# Hey! 😊" />} />
          </ActionPanel>
        }
      />
    </List>
  );
}
