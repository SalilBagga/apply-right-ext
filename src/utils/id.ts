// Local id generator for mock/ephemeral list items (experience entries, custom
// sections, etc). Nothing here is persisted — ids only need to be stable for
// the lifetime of the popup's in-memory state.

let counter = 0;

export function makeId(prefix = "id"): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}
