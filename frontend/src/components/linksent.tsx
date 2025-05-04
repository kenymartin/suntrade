const LinkSent = () => {
   const css:React.CSSProperties | undefined={
    color: "green",
    textAlign: "center",
    marginTop: "20px",
    fontSize: "20px"
   }
    return (
      <>
        <h1 style={css}>Link sent to your email. Please check your inbox</h1>
      </>
    );
}
 
export default LinkSent;