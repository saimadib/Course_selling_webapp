import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import config from '../../config/config';

const token = localStorage.getItem("auth-token-user");
const headers = {
    Authorization: "Bearer " + token,
};

export default function UseCoursedata() {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = config.base_url + '/api/user/courses';
        const loginRes = await Axios.get(url,{headers});
        setCourseData(loginRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return courseData;
}
