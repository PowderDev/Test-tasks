import { Field, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toTitle from "../helpers/convertToTitle";
import gsap from "gsap";

const UserForm = () => {
  const [initialValues, setInitValues] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const onSubmit = (values: any) => {
    console.log(values);
  };
  const params = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (params.id) {
      fetch(`https://jsonplaceholder.typicode.com/users?id=${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          data = data[0];
          setInitValues({
            name: data.name,
            username: data.username,
            email: data.email,
            street: data.address.street,
            city: data.address.city,
            zipcode: data.address.zipcode,
            phone: data.phone,
            website: data.website,
            comment: "",
          });
        })
        .catch((err) => console.error(err));
    } else {
      nav("/");
    }
  }, [params]);

  const handleBackButton = async () => {
    await gsap.to(".edit-container", { x: "150%", duration: 1 });
    nav("/");
  };

  return (
    <div className="edit-form">
      {Object.keys(initialValues).length > 0 && (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(props: FormikProps<any>) => {
            const fields = Object.keys(props.values);

            return fields.map((field, i) => (
              <div key={field} className="field">
                <label htmlFor={field}>{toTitle(field)}:</label>
                {field === "comment" ? (
                  <Field
                    disabled={!canEdit}
                    as="textarea"
                    name={field}
                    id={field}
                    value={props.values[field]}
                  />
                ) : (
                  <Field disabled={!canEdit} name={field} id={field} value={props.values[field]} />
                )}
                {i === fields.length - 1 && (
                  <>
                    <div className="buttons">
                      <button type="reset" onClick={handleBackButton}>
                        Back
                      </button>
                      <button type="submit" onClick={props.handleSubmit}>
                        Submit
                      </button>
                    </div>

                    <button type="button" onClick={() => setCanEdit(!canEdit)}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            ));
          }}
        </Formik>
      )}
    </div>
  );
};

export default UserForm;
