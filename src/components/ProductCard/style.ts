import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: { flex: 1, backgroundColor: '#f9f9f9', padding: 12, borderRadius: 8, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ddd' },
    image: { width: '100%', height: 120, borderRadius: 6, marginBottom: 8, backgroundColor: '#eaeaea' },
    title: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    price: { marginBottom: 8, color: '#333' },
    button: { backgroundColor: '#111', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
    buttonDisabled: { backgroundColor: '#888' },
    buttonText: { color: '#fff', fontWeight: '600' },
});

export default styles;
