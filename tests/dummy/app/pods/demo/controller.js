import Controller from '@ember/controller';

import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';

export default class DemoController extends Controller {

  @service()
  keycloakSession;

  @service()
  cookies;

  @computed()
  get allCookies() {

    let cookieService = this.get('cookies');

    let cookies = cookieService.read();

    return Object.keys(cookies).reduce((acc, key) => {
      let value = cookies[key];
      acc.push({ name: key, value });

      return acc;
    }, []);
  }

  init() {

    super.init(...arguments);

    let cookies = this.get('cookies');

    this.set('url', cookies.read('keycloak-url'));
    this.set('realm', cookies.read('keycloak-realm'));
    this.set('clientId', cookies.read('keycloak-clientId'));
  }

  @action
  async initKeycloak() {

    let session = this.get('keycloakSession');
    let cookies = this.get('cookies');

    let url = this.get('url');
    let realm = this.get('realm');
    let clientId = this.get('clientId');
    let flow = this.get('flow') || 'implicit';
    let checkLoginIframe = this.get('checkLoginIframe') || "true";
    let onLoad = this.get('onLoad') || "login-required";

    // save details as cookies for subsequent initializations
    cookies.write('keycloak-url', url);
    cookies.write('keycloak-realm', realm);
    cookies.write('keycloak-clientId', clientId);

    if (url && realm && clientId) {

      let options = {
        url,
        realm,
        clientId,
      };

      await session.installKeycloak(options);

      let initOptions = {
        flow,
        checkLoginIframe :  checkLoginIframe === "true",
        onLoad
      };

      session.initKeycloak(initOptions);

    } else {

      alert('Config details incomplete');
    }
  }
}
