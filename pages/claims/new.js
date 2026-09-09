import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  policyNo: Yup.string()
    .required("Policy number is required")
    .matches(
      /^HDFC-LIFE-[0-9]{4}$/,
      "Policy number must be in the format HDFC-LIFE-1001"
    ),

  claimAmount: Yup.number()
    .typeError("Claim amount must be a number")
    .required("Claim amount is required")
    .min(1, "Claim amount must be at least 1")
    .max(500000, "Claim amount cannot exceed 500000"),

  urgency: Yup.string()
    .required("Urgency is required")
    .oneOf(
      ["HIGH", "MEDIUM", "LOW"],
      "Please select a valid urgency"
    ),

  hospitalName: Yup.string(),

  email: Yup.string()
    .required("Advisor email is required")
    .email("Enter a valid email"),

  remarks: Yup.string()
    .max(200, "Notes cannot exceed 200 characters"),
});

export default function NewClaim() {
  return (
    <div>
      <h1>File a Claim</h1>

      <Formik
        initialValues={{
          policyNo: "",
          claimAmount: "",
          urgency: "",
          hospitalName: "",
          email: "",
          remarks: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setStatus }) => {
          console.log(values);

          setStatus(
            `Claim submitted for ${values.policyNo}`
          );
        }}
      >
        {({ status }) => (
          <Form>
            {/* Policy Number */}
            <div>
              <label htmlFor="policyNo">
                Policy number
              </label>

              <Field
                id="policyNo"
                name="policyNo"
                type="text"
              />

              <ErrorMessage
                name="policyNo"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            {/* Claim Amount */}
            <div>
              <label htmlFor="claimAmount">
                Claim amount
              </label>

              <Field
                id="claimAmount"
                name="claimAmount"
                type="number"
              />

              <ErrorMessage
                name="claimAmount"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            {/* Urgency */}
            <div>
              <label htmlFor="urgency">
                Urgency
              </label>

              <Field
                as="select"
                id="urgency"
                name="urgency"
              >
                <option value="">
                  Select urgency
                </option>

                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </Field>

              <ErrorMessage
                name="urgency"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            {/* Hospital */}
            <div>
              <label htmlFor="hospitalName">
                Hospital
              </label>

              <Field
                id="hospitalName"
                name="hospitalName"
                type="text"
              />

              <ErrorMessage
                name="hospitalName"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            {/* Advisor Email */}
            <div>
              <label htmlFor="email">
                Advisor email
              </label>

              <Field
                id="email"
                name="email"
                type="email"
              />

              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="remarks">
                Notes
              </label>

              <Field
                as="textarea"
                id="remarks"
                name="remarks"
              />

              <ErrorMessage
                name="remarks"
                component="div"
                style={{ color: "red" }}
              />
            </div>

            <button type="submit">
              Submit Claim
            </button>

            {status && (
              <p style={{ color: "green" }}>
                {status}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}