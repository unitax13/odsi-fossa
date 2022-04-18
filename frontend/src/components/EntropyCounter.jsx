function EntropyCounter({ password }) {
  // console.count("updated")

  // Shannon entropy
  const entropy = (str) => {
    return (
      str.length *
      [...new Set(str)]
        .map((chr) => {
          return str.match(new RegExp(chr, "g")).length;
        })
        .reduce((sum, frequency) => {
          let p = frequency / str.length;
          return sum + p * Math.log2(1 / p);
        }, 0)
    );
  };

  return (
    <div>
      {password.length > 3 ? (
        <div>
          Entropy of your password = {entropy(password).toFixed(2)} (
          {entropy(password) < 25 ? "Too weak!" : "Reasonable"}){" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EntropyCounter;
