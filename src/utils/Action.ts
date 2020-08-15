import { JsonObject } from "./ComponentManager";
import { ListItem, ListItemGroup } from "./ListItem";
import { actionFromJson } from "./ActionManager";

export abstract class Action implements ListItem {
  public static icon = "play_circle_outline";
  public icon = Action.icon;
  public hideable = false;

  abstract toDataObj(): JsonObject;
  abstract get id(): string;

  get name() {
    return this.id;
  }

  toJsonObj() {
    return {
      id: this.id,
      ...this.toDataObj()
    };
  }

  toJson() {
    return JSON.stringify(this.toJsonObj());
  }

  isGroup(): this is ListItemGroup {
    return false;
  }

  duplicate() {
    return actionFromJson(this.toJsonObj());
  }
}