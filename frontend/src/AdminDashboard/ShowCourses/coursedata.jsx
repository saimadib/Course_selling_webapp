import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import config from '../../config/config';
import {useSetRecoilState,useRecoilValue,} from 'recoil';
import { courseData } from '../../Store/Atom/admin';

const token = localStorage.getItem("auth-token-admin");
const headers = {
    Authorization: "Bearer " + token,
};

export default function UseCoursedata() {
  const courseValue=useRecoilValue(courseData);
  const setCourseData=useSetRecoilState(courseData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = config.base_url + '/api/admin/courses';
        const loginRes = await Axios.get(url,{headers});
        setCourseData(loginRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return courseValue;
}
