// Get Headers
export const getHeaders = (token = null) => {
  const headers = new Headers();
  headers.append('di_order', token);
  headers.append('Content-Type', 'application/json');

  return headers;
};

export const temp = () => {};

// export const openOrder = async (token) => {
//   try {
//     const headers = getHeaders(token);
//     const url = '/j/DI_OpenOrder.aspx';
//     const response = await fetch(url, { headers });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.msg || 'Could not fetch open order api');
//     }
//     if (data.code !== 200) {
//       throw new Error(data.msg || 'Fetch open order fail.');
//     }
//     return data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getExrate = async (token) => {
//   try {
//     const headers = getHeaders(token);
//     const url = 'https://www.k100u.com/j/DI_exrate.aspx';
//     const response = await fetch(url, { headers });
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.msg || 'Could not fetch open order api');
//     }
//     if (data.code !== 200) {
//       throw new Error(data.msg || 'Fetch open order fail.');
//     }
//     return data.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
