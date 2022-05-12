import { Button, Group, Modal, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";
import { yupResolver, useForm } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import { FC, useContext } from "react";
import * as Yup from "yup";
import gsap from "gsap";
import { StateContext } from "../App";
import { authSubmit, getMe } from "../http/auth";

const schema = Yup.object().shape({
  nickname: Yup.string().min(3, "Nickname should have at least 3 letters"),
  email: Yup.string().email("Invalid email"),
  password: Yup.string().min(3, "Password must be at least 3 letters"),
});

interface Props {
  toggleModal: () => void;
  opened: boolean;
}

const AuthModal: FC<Props> = ({ opened, toggleModal }) => {
  const [type, toggleType] = useToggle<"register" | "login">("register", ["register", "login"]);
  const { setUser } = useContext(StateContext);

  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      nickname: "",
      email: "",
      password: "",
    },
  });

  const handleTypeChange = async () => {
    const startPercent = type === "register" ? "-100%" : "100%";
    const endPercent = type === "register" ? "100%" : "-100%";
    const tl = gsap.timeline({ defaults: { duration: 0.75 } });
    await tl.to("#modal-content", { x: endPercent });
    toggleType();
    tl.fromTo("#modal-content", { x: startPercent }, { x: 0 });
  };

  const handleSubmit = async () => {
    await authSubmit(type, form.values);
    const user = await getMe();
    if (user) {
      setUser(user);
      toggleModal();
      form.reset();
    }
  };

  return (
    <Modal centered opened={opened} onClose={() => toggleModal()}>
      <div id="modal-content">
        <Title order={3} align="center">
          {type == "register" ? "Registration" : "Login"}
        </Title>
        <form onSubmit={form.onSubmit((vals) => console.log(vals))}>
          <TextInput
            required
            label="Email"
            placeholder="example@mail.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="******"
            mt="sm"
            {...form.getInputProps("password")}
          />
          {type === "register" && (
            <TextInput required label="Nickname" mt="sm" {...form.getInputProps("nickname")} />
          )}

          <Stack align={"center"} justify="center" mt="xl">
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
            <Group spacing={3}>
              <Text>
                {type == "register" ? "Already have an account?" : "Don't have an account yet?"}
              </Text>
              <Text variant="link" onClick={handleTypeChange}>
                {type == "register" ? "Login" : "Register"}
              </Text>
            </Group>
          </Stack>
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
