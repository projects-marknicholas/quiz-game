import { API_KEY, endpoints } from './config';

export const SampleFunction = ({ sampleParameter }) => {
  return(
    <>
      <h1>This is the sample parameter: {sampleParameter}</h1>
      <h1>This is the sample api key: {API_KEY}</h1>
      <h1>This is the sample endpoint: {endpoints.sampleEndpoint}</h1>
    </>
  );
}

export const SampleFunction2 = ({ sampleParameter2 }) => {
  return(
    <>
      <h1>This is the sample parameter2: {sampleParameter2}</h1>
      <h1>This is the sample api key: {API_KEY}</h1>
      <h1>This is the sample endpoint: {endpoints.sampleEndpoint}</h1>
    </>
  );
}