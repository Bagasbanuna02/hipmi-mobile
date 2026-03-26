import { MainColor } from "@/constants/color-palet";
import {
  DEFAULT_COUNTRY,
  searchCountries,
  type CountryData,
} from "@/constants/countries";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PhoneInputProps {
  value: string;
  onChangePhoneNumber: (phone: string) => void;
  selectedCountry?: CountryData;
  onChangeCountry: (country: CountryData) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function PhoneInputCustom({
  value,
  onChangePhoneNumber,
  selectedCountry = DEFAULT_COUNTRY,
  onChangeCountry,
  placeholder = "Masukkan nomor",
  disabled = false,
}: PhoneInputProps) {
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = searchCountries(searchQuery);

  const handleSelectCountry = (country: CountryData) => {
    onChangeCountry(country);
    setCountryPickerVisible(false);
    setSearchQuery("");
  };

  const handlePhoneChange = (text: string) => {
    // Only allow numbers and spaces
    const cleaned = text.replace(/[^\d\s]/g, "");
    onChangePhoneNumber(cleaned);
  };

  return (
    <>
      {/* Phone Input Field */}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.countryPickerButton}
          onPress={() => setCountryPickerVisible(true)}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <Text style={styles.countryCodeText}>+{selectedCountry.callingCode}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TextInput
          style={[styles.phoneInput, disabled && styles.disabledInput]}
          placeholder={placeholder}
          placeholderTextColor={MainColor.placeholder}
          value={value}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          autoComplete="tel"
          importantForAutofill="yes"
          editable={!disabled}
        />
      </View>

      {/* Country Picker Modal */}
      <Modal
        visible={countryPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCountryPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Pilih Negara</Text>
              <TouchableOpacity onPress={() => setCountryPickerVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder="Cari negara atau kode..."
              placeholderTextColor={MainColor.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />

            <ScrollView style={styles.countryList}>
              {filteredCountries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  style={[
                    styles.countryItem,
                    selectedCountry.code === country.code &&
                      styles.countryItemSelected,
                  ]}
                  onPress={() => handleSelectCountry(country)}
                  activeOpacity={0.7}
                >
                  <View style={styles.countryInfo}>
                    <Text style={styles.countryName}>{country.name}</Text>
                    <Text style={styles.countryCode}>+{country.callingCode}</Text>
                  </View>
                  {selectedCountry.code === country.code && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // Container
  container: {
    flexDirection: "row",
    backgroundColor: MainColor.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: MainColor.white_gray,
    marginBottom: 16,
    overflow: "hidden",
  },
  // Country Picker Button
  countryPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: MainColor.text_input,
    borderRightWidth: 1,
    borderRightColor: MainColor.white_gray,
  },
  countryCodeText: {
    fontSize: 16,
    color: MainColor.black,
    fontWeight: "600",
  },
  dropdownIcon: {
    fontSize: 18,
    color: MainColor.placeholder,
    marginLeft: 4,
  },
  // Divider
  divider: {
    width: 1,
    backgroundColor: MainColor.white_gray,
  },
  // Phone Input
  phoneInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 16,
    color: MainColor.black,
  },
  disabledInput: {
    backgroundColor: MainColor.text_input,
    color: MainColor.placeholder,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: MainColor.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: MainColor.white_gray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: MainColor.black,
  },
  modalClose: {
    fontSize: 24,
    color: MainColor.placeholder,
    padding: 5,
  },
  // Search Input
  searchInput: {
    backgroundColor: MainColor.text_input,
    margin: 16,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: MainColor.black,
  },
  // Country List
  countryList: {
    paddingHorizontal: 16,
  },
  countryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: MainColor.white_gray,
  },
  countryItemSelected: {
    backgroundColor: MainColor.soft_darkblue + "15",
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    color: MainColor.black,
    fontWeight: "500",
  },
  countryCode: {
    fontSize: 14,
    color: MainColor.placeholder,
    marginTop: 2,
  },
  checkmark: {
    fontSize: 20,
    color: MainColor.green,
    fontWeight: "bold",
  },
});
