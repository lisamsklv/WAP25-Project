import { Form, Input, Button, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function RecipeForm({ onSubmit, initialValues }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        label="Titel"
        name="title"
        rules={[{ required: true, message: "Bitte Titel eingeben" }]}
      >
        <Input />
      </Form.Item>

      <Form.List name="ingredients" rules={[{ required: true, message: "Bitte mindestens eine Zutat hinzufügen" }]}>
        {(fields, { add, remove }) => (
          <>
            <label style={{ fontWeight: "bold" }}>Zutaten</label>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "amount"]}
                  rules={[{ required: true, message: "Bitte Menge eingeben" }]}
                >
                  <Input placeholder="Menge (z.B. 200g)" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  rules={[{ required: true, message: "Bitte Zutat eingeben" }]}
                >
                  <Input placeholder="Zutat" />
                </Form.Item>


                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Zutat hinzufügen
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item label="Beschreibung" name="description" rules={[{ required: true, message: "Bitte Beschreibung eingeben" }]}>
        <Input.TextArea rows={10} />
      </Form.Item>


      <Form.Item label="Kategorie" name="category" rules={[{ required: true, message: "Bitte Kategorie auswählen" }]}>
        <Select>
          <Select.Option value="vegetarian">Vegetarisch</Select.Option>
          <Select.Option value="vegan">Vegan</Select.Option>
          <Select.Option value="meat">Fleisch</Select.Option>
          {/* weitere kategorien wie mittagsgerichte, winterspeisen etc. */}
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Speichern
      </Button>

    </Form>
  );
}
