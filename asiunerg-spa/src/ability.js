import { Ability, AbilityBuilder } from "@casl/ability"
import { store } from 'createStore';

// Defines how to detect object's type
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item
  }
  return item.__type
}

const ability = new Ability([], { subjectName })

let currentAuth;
store.subscribe(() => {
  const prevAuth = currentAuth;
  currentAuth = store.getState().auth;
  if (prevAuth !== currentAuth) {
    ability.update(defineRulesFor(currentAuth));
  }
});

function defineRulesFor(auth) {
  const { can, rules } = AbilityBuilder.extract();
  if (auth.roleSelected === "Student") {
    can("view", "NavbarStudent")
    can("view", "RoutesStudent")
  }
  if (auth.roleSelected === "Teacher") {
    can("view", "NavbarTeacher")
    can("view", "RoutesTeacher")
  }
  return rules
}

export default ability;