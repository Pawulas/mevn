import axois from 'axios';


export default() => {
   return axois.create({
    baseURL : 'http://localhost:3000'
  });
};