function EntropyCounter({ password }) {
  // console.count("updated")

  // Shannon entropy
  const entropy = (str) => {
    const len = str.length
 
    // Build a frequency map from the string.
    const frequencies = Array.from(str)
      .reduce((freq, c) => (freq[c] = (freq[c] || 0) + 1) && freq, {})
   
    // Sum the frequency of each character.
    return Object.values(frequencies)
      .reduce((sum, f) => sum - f/len * Math.log2(f/len), 0)
  };

  return (
    <div>
      {password.length > 3 ? (
        <div>
          Entropy of your password = {entropy(password).toFixed(2)} (
          {entropy(password) < 3 ? "Too weak!" : "Reasonable"}){" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EntropyCounter;
