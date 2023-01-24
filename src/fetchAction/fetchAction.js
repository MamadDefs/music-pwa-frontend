export const fetchAction=()=>{
    const proxy="https://music-pwa-api.iran.liara.run";
    const request = new XMLHttpRequest();

    try {
      request.open('GET', `${proxy}/api/users/auth`);

      request.responseType = 'json';

      request.addEventListener('load', () => console.log(request.response));
      request.addEventListener('error', () => console.error('XHR error'));

      request.send();

    } catch (error) {
      console.error(`XHR error ${request.status}`);
    }
}