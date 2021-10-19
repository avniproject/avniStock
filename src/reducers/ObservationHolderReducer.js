import {getService} from '../hooks/getService';
import EntityService from '../service/EntityService';
import Concept from '../models/reference/Concept';

export default class ObservationHolderReducer {
  static onPrimitiveValueChange(state, action) {
    const newState = state.clone();
    const {value, conceptName} = action.payload;
    const concept = getService(EntityService).findByName(
      conceptName,
      Concept.schema.name,
    );
    newState.observationHolder.addOrUpdatePrimitiveObs(concept, value);
    return newState;
  }
}
