import Route from '@ember/routing/route';

import KeycloakAuthenticatedRouteMixin from '@superrugdr/ember-keycloak-auth/mixins/keycloak-authenticated-route';

export default class ProtectedMixinRoute extends Route.extend(KeycloakAuthenticatedRouteMixin) {
}
