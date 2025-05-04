

const ValidationAlert = (props: any) => {
  const title = props.title
  console.log('Important Message!!',title)
    return (
      <>
        <div
          className="alert alert-warning bd-0 alert-dismissible fade show"
          role="alert"
        >
          <h4 className="alert-heading">{props.data.title}</h4>
          <div className="alert-content">
            <ul className="a-unordered-list a-nostyle a-vertical" role="alert">
              <li>
                <span className="a-list-itemr">
                    {props.data.message}
                   <b>{props.data.email}</b>
                  {/* <b>keny_m@hotmail.com</b>. */}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
}
 
export default ValidationAlert;