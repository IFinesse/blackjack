export const ACTION_DIVIDER = ' -> ';

export const ACTIONS_SUBTYPES = Object.freeze({
  PRE_START: 'PRE_START',
  START: 'START',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',

  STATE: 'STATE',

  DONE: 'DONE',

  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  UNDO: 'UNDO',
});

export function createAction(
  type,
  structure,
  isMultiInstanceProcess = false,
  promisify = false,
) {
  const actionGenerator = actionId => {
    const actionObject = {
      majorType: type,
      id: actionId,
    };

    if (structure) {
      Object.keys(structure).forEach(actionPart => {
        actionObject[actionPart] = {};

        const actionPartType = `${type}${ACTION_DIVIDER}${actionPart.toUpperCase()}`;

        actionObject[actionPart].type = actionPartType;
        actionObject[actionPart].id = actionId;

        if (structure[actionPart]) {
          if (structure[actionPart] instanceof Function) {
            // Use function provided by consumer

            actionObject[actionPart].create = (...params) => ({
              type: actionPartType,
              payload: structure[actionPart](...params),
              id: actionId,
              promisify,
            });
          } else {
            // Use default creator without payload

            actionObject[actionPart].create = () => ({
              type: actionPartType,
              id: actionId,
              promisify,
            });
          }
        }

        actionObject[actionPart] = Object.freeze(actionObject[actionPart]);
      });
    } else {
      actionObject.type = type;
      actionObject.id = actionId;
      actionObject.promisify = promisify;
    }

    return Object.freeze(actionObject);
  };

  return isMultiInstanceProcess ? actionGenerator : actionGenerator();
}

// const TEST_ACTION = createAction('TEST_ACTION', {
//   START: (type, uid) => ({                       // Custom action creator
//     type: type,
//     payload: { uid },
//   }),
//   STATE: null,                                   // No create function
//   STATUS: true,                                  // Default action creator
// });
