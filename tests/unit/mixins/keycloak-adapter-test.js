import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

import { setupMirage } from 'ember-cli-mirage/test-support';
import { login, setupKeycloakSession } from '@superrugdr/ember-keycloak-auth/test-support';
import { setupKeycloakMirageAuth } from '@superrugdr/ember-keycloak-auth/test-support/mirage';

module('Unit | Mixins | keycloak adapter', function(hooks) {

  setupTest(hooks);
  setupMirage(hooks);
  setupKeycloakSession(hooks);
  setupKeycloakMirageAuth(hooks);

  test('test save model', async function(assert) {

    login(this.owner);

    const aModel = run(() => this.owner.lookup('service:store').createRecord('model-a'));

    await aModel.save();

    assert.ok(aModel);
  });

});
