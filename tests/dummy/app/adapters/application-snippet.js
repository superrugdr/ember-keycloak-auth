import JSONAPIAdapter from 'ember-data/adapters/json-api';

import KeycloakAdapterMixin from '@superrugdr/ember-keycloak-auth/mixins/keycloak-adapter';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(KeycloakAdapterMixin) {

}
