import "./registrationPage.scss"

const RegistrationPage = () => {
  return (
    <div className="registrationPage">
      <section className="container">
        <div className="login-container">
          <div className="form-container">
            <h1 className="opacity">REGISTRATION</h1>
            <form>
              <input type="text" placeholder="ORGANIZATION NAME *" />
              <input type="text" placeholder="USERNAME *" />
              <input type="text" placeholder="CATEGORY *" />
              <input type="text" placeholder="EMAIL *" />
              <input type="text" placeholder="PHONE NUMBER *" />
              <input type="password" placeholder="PASSWORD *" />
              <input type="password" placeholder="REPEAT PASSWORD *" />
              <textarea placeholder="DESCRIPTION" />
              <button className="opacity">SUBMIT</button>
            </form>
          </div>
        </div>
        <div className="theme-btn-container"></div>
      </section>
    </div>
  );
};

export default RegistrationPage;
