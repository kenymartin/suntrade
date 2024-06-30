import { ReactNode } from 'react';
const InfinitScroll = (props: { children?: any | any[]|ReactNode }) => {
    const children = props.children
    return (
      <>
        <div className="wrapper">
          <div className="elementScroll">
                    {children}
                   
          </div>
        </div>
      </>
    );
}
 
export default InfinitScroll;