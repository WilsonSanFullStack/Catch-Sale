import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Clipboard
} from "react-native";

// import Clipboard from "@react-native-community/clipboard";

export default function App() {
  const [codigo, SetCodigo] = useState();
  const [precio, SetPrecio] = useState();
  const [cantidad, SetCantidad] = useState();
  const [factura, setFactura] = useState([]);

  const handleFactura = () => {
    const newProducto = {
      codigo: parseInt(codigo),
      precio: parseInt(precio),
      cantidad: parseInt(cantidad),
      subTotal: parseInt(precio) * parseInt(cantidad),
    };
    setFactura([...factura, newProducto]);
    SetCodigo();
    SetCantidad();
    SetPrecio();
  };
  const handleDelete = (productId) => {
    const updatedFactura = factura.filter((producto) => producto.codigo !== productId);
    setFactura(updatedFactura);
  };
  const [cliente, setCliente] = useState();
  const [vendedor, setVendedor] = useState();

  // console.log(codigo, precio, cantidad);
  let total = 0;
  for (const x of factura) {
    total += x.subTotal;
  }
  const formatFactura = () => {
    const formattedFactura = `codigo Cliente: ${cliente},
codigo Vendedor: ${vendedor},
productos:
${factura
  .map(
    (producto) =>
      `cantidad: ${producto.cantidad}, codigo: ${producto.codigo}, precio: ${producto.precio}, subTotal: ${producto.subTotal}`
  )
  .join("\n")}
total: ${total}`;
    return formattedFactura;
  };

  const formattedFactura = formatFactura();
  console.log(formattedFactura);
  const copyFacturaToClipboard = () => {
 Clipboard.setString(formattedFactura);
    alert('se pego al portapapeles la factura')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Catch Sale</Text>
      <View style={{ justifyContent: "space-between" }}>
        <Text style={styles.producto}>Producto</Text>
        <View style={styles.view}>
          <Text style={styles.label}>Codigo:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="codico del articulo"
            style={styles.input}
            value={codigo}
            onChangeText={(text) => SetCodigo(text)}
          />
        </View>

        <View style={styles.view}>
          <Text style={styles.label}>Precio:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="precio del articulo"
            style={styles.input}
            value={precio}
            onChangeText={(text) => SetPrecio(text)}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.label}>Cantidad:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="cabtidad del articulo"
            style={styles.input}
            value={cantidad}
            onChangeText={(text) => SetCantidad(text)}
          />
        </View>
      </View>
      <View>
        <Button title="agregar" onPress={handleFactura}></Button>
      </View>
      <View style={styles.stickyHeader}>
        <Text style={styles.encabezado}>##</Text>
        <Text style={styles.encabezado}>codigo</Text>
        <Text style={styles.encabezado}>precio</Text>
        <Text style={styles.encabezado}>cantidad</Text>
        <Text style={styles.encabezado}>subTotal</Text>
        <Text style={styles.encabezado}>eliminar</Text>
      </View>
      <ScrollView
        style={{
          borderColor: "white",
          borderWidth: 2,
          width: "99%",
          marginLeft: 2,
        }}
      >
        {factura?.map((producto, index) => {
          return (
            <View style={styles.table} key={index + 1}>
              <Text style={styles.fila}>{index + 1}</Text>
              <Text style={styles.fila}>{producto.codigo}</Text>
              <Text style={styles.fila}>
                {producto.precio.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.fila}>
                {producto.cantidad.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text style={styles.fila}>
                {producto.subTotal.toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })}
              </Text>
              <View style={styles.fila}>
                <Button title="eliminar" onPress={() => handleDelete(producto.codigo)}></Button>
              </View>
            </View>
          );
        })}
        <View style={styles.table}>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}></Text>
          <Text style={styles.fila}>Total:</Text>
          <Text style={styles.fila}>
            {total.toLocaleString("es-ES", {
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
      </ScrollView>
      <View style={{ marginTop: 10 }}>
        <View style={styles.view}>
          <Text style={styles.label}>Cliente:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="codico del cliente"
            style={styles.input}
            value={cliente}
            onChangeText={(text) => setCliente(text)}
          />
        </View>
        <View style={styles.view}>
          <Text style={styles.label}>Vendedor:</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="codico del vendedor"
            style={styles.input}
            value={vendedor}
            onChangeText={(text) => setVendedor(text)}
          />
        </View>
      </View>
      <View>
        <Button title="Guardar" onPress={copyFacturaToClipboard}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  text: {
    fontSize: 20,
    margin: 20,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  producto: {
    fontSize: 15,
    margin: 15,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    // backgroundColor: 'red'
  },
  label: {
    color: "white",
    fontWeight: "bold",
    margin: 10,
    marginRight: 5,
    textAlign: "center",
    width: "25%",
  },
  input: {
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 5,
    color: "black",
    width: "80%",
    backgroundColor: "lightgray",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  stickyHeader: {
    marginTop: 10,
    backgroundColor: "gray", // Adjust background color as needed
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    position: "relative", // Make headers stick to the top
    top: 0, // Set top position to 0 for proper placement
    zIndex: 100, // Ensure headers stay on top during scrolling
    width: "98%",
  },
  table: {
    flexDirection: "row",
    margin: 2,
    width: "98%",
    marginLeft: 4,
    color: "white",
    justifyContent: "space-between",
    borderColor: "gray",
    borderWidth: 2,
  },
  encabezado: {
    justifyContent: "center",
    textAlign: "center",
    margin: 4,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  fila: {
    justifyContent: "center",
    textAlign: "center",
    margin: 4,
    color: "white",
  },
});
