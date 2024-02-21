import React from 'react';

import { Card } from '../';

import './CardFullSection.styles.css';

export const CardFullSection = (props) => {
  const { title, data, type, children } = props;

  return (
    <div className="main__full flex flex-col mb-[1rem] min-w-full min-h-[300px] z-[1] content-center ">
      <div className="main__full--header flex justify-between items-center">
        <h2>{title}</h2>
      </div>
      <div className="main__full--main flex justify-start items-center gap-[24px] flex-wrap">
        {children && children}
        {data && data.map((e, index) => <Card data={e} key={index} />)}
      </div>
    </div>
  );
};
