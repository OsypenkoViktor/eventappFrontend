import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import {
  Button,
  Form,
  Input,
  Radio,
  Typography,
  Spin,
  notification,
} from "antd";
import {
  emailValidationRules,
  fullNameValidationRules,
  sourceValidationRules,
  birthValidationsRules,
} from "../../helpers/inputValidators";
import { Rule } from "antd/es/form";
import axios, { AxiosError } from "axios";

type FieldType = {
  fullname?: string;
  email?: string;
  birth?: string;
  source?: string;
  eventId?: string;
};

const { Title } = Typography;

const RegisterForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const { eventId } = useParams();
  const [error, setError] = useState<unknown | undefined>(undefined);
  const navigate = useNavigate();

  const openNotification = () => {
    api.success({
      message: "Success",
      description: "Your request has been recorded",
      duration: 2,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    values.eventId = eventId;
    setIsLoading(true);
    axios
      .post(process.env.REACT_APP_BASE_API_URL! + "/participant", values)
      .then((res) => {
        console.log(res);
        openNotification();
        setTimeout(() => {
          navigate("/", { state: { result: "success" } });
        }, 3000);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          setError(error.response.data);
          console.log(error);
        }
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <div style={formContainerStyle}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={formContainerStyle}>
          <Title level={2}>Event registration</Title>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={formStyle}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelWrap={true}
          >
            <Form.Item<FieldType>
              label="Full name"
              name="fullname"
              rules={fullNameValidationRules}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={emailValidationRules as Rule[]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Date of birth"
              name="birth"
              rules={birthValidationsRules}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Where did you hear about this event?"
              name="source"
              rules={sourceValidationRules}
            >
              <Radio.Group>
                <Radio value={"Social media"}>Social media</Radio>
                <Radio value={"Friends"}>Friends</Radio>
                <Radio value={"Found myself"}>Found myself</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default RegisterForm;

const formContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const formStyle: React.CSSProperties = { maxWidth: 600 };
