module.exports = function myBablePlug() {
  return {
    visitor: {
      VariableDeclaration: function (path) {
        console.log("VariableDeclaration() kind:", path.node.kind); // const

        // const => bar 변환
        if (path.node.kind === "const") {
          path.node.kind = "var";
        }
      },
    },
  };
};
