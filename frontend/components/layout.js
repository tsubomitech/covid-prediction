import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout(props) {
  return (
    <div className="container">
      <Header></Header>
      <Body>
          <Navbar></Navbar>
        {props.children}
      </Body>
      <Footer></Footer>
    </div>
  );
}
