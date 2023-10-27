import React, { useContext, useEffect, useState } from 'react';
import AuthContext from 'app/contexts/AuthContext';

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toISOString().split('T')[0];
  const formattedTime = date.toTimeString().split(' ')[0];
  return { formattedDate, formattedTime };
};

const AppProgress = () => {
  const { forms, getForms } = useContext(AuthContext);
  const [formsArray, setFormsArray] = useState([]);

  useEffect(() => {
    getForms();
  }, []);

  useEffect(() => {
    if (forms) {
      const formsArray = Object.keys(forms).map((key) => forms[key]);
      setFormsArray(formsArray);
    }
  }, [forms]);

  return (
    <div>
      {formsArray.length > 0 ? (
        <div>
          {formsArray[0].map((form, index) => (
            <div
              key={form._id}
              style={{
                marginLeft: 300,
                marginTop: 50,
                border: '5px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                width: 1000
              }}
            >
              <h2>Form {index + 1}:</h2>
              <p>
                <b>Reporter Name:</b> {form.username}
              </p>
              <p>
                <b>Email:</b> {form.email}
              </p>
              <p>
                <b>Date:</b> {form.date}
              </p>
              <p>
                <b>Time:</b> {form.time}
              </p>
              <p>
                <b>Contact:</b> {form.mobile}
              </p>
              <p>
                <b>Gender:</b> {form.gender}
              </p>
              <p>
                {form.inputValues && (
                  <div>
                    <b>Reported injury details:</b>
                    <ul>
                      {Object.entries(form.inputValues).map(([key, value]) => (
                        <li key={key}>
                          <b>{key}:</b> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forms available</p>
      )}
    </div>
  );
};

export default AppProgress;
