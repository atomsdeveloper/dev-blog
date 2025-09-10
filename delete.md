# Herança e Cadeia de Protótipos

#### Quando se trata de herança, o Js tem somente um constructor: Objetos.

Cada objeto tem um link interno para um outro objeto chamado: Prototype.
Esse objeto Prototype também tem um atributo Prototype, e assim por diante até o valor encontrado no proto seja 'null'.

Neste artigo veremos como pega as propriedades subindo na cadeia de protótipos, começando do objeto em si, todos objeto em Js tem pelo menos uma herança de outros objetos que é chamada de **_`proto`_**.

- Esta estrutura de repetição pega as propriedades enumeráveis e não enumeráveis diferentemente de "Object.keys()".
  1. 0 nível = props do objetos, neste caso as props recebidas são do objeto 'myHonda' que são: "colors", "doors" e "engines".
  2. 1 nível = props de "Object.prototype" como "constructor", "toString", "valueOf", "hasOwnProperty" ...
  3. 2 nível = null

Atribuindo ao objeto atual o objeto de herança que contém dentro do objeto atual para ser percorrido também.
Esse objeto pode ter outro _proto_ / Objetct e se tiver será feita a reatribuição novamente até o **proto** for = null.
obj. [[Prototype]] possui propriedades bec.
obj. [[Prototype]]. [[Prototype]] é Object.prototype.
Finalmente, obj. [[Prototype]]. [[Prototype]]. [[Prototype]] é nulo.
Este é o fim da cadeia de protótipos, como nulo,

```javascript
{
  let fn = function () {
    (this.a = 1), (this.b = 2);
  };

  let Inheritance = new fn();

  // Adicionar propriedades no protótipo da função construtora 'fn'.
  fn.prototype.b = 3;
  fn.prototype.c = 4;

  // Iso quebra a cadeia de protótipos.
  fn.prototype.d = { f: 5, g: 9 };

  console.log(Inheritance.a);
  console.log(Inheritance.c);
  console.log(Inheritance.d);

  // Veja a cadeia de propriedades.
  function listAllPropertiesWithOrigin(myObj) {
    let objectToInspect = myObj;
    let level = 0;
    const result = [];

    while (objectToInspect !== null) {
      const props = Object.getOwnPropertyNames(objectToInspect); // Propriedades do objeto atual.

      result.push({
        level,
        prototype: objectToInspect.constructor
          ? objectToInspect.constructor.name
          : "null",
        properties: props,
      });

      objectToInspect = Object.getPrototypeOf(objectToInspect); // __proto__ / Object / {}
      level++;
    }

    return result;
  }
  console.log(listAllPropertiesWithOrigin(Inheritance));
}
```

## Herança de Métodos

JavaScript não tem métodos como os que conhecemos em liguagens baseadas em classes. Em Js qualquer função pode ser adicionada a um objeto em forma de propriedade. Quando um método de herança é executado o valor de 'this' aponta para o objeto que herdou as propriedades.

```Javascript
{
var obj = {
name: "Renan",
fnMethod: function () {
return this.name;
},
};

console.log(obj.fnMethod());

const otherObj = Object.create(obj); // Cria um novo objeto com todas as propriedades do objeto passado como param.

otherObj.name = "Change name"; // Alterando a propriedade herdada.
console.log(otherObj.fnMethod()); // Executando o método herdado.
}
```

## Objetos Encadeados

Este objeto craido tem o 'Object.prototype' sendo o seu [[Prototype]].
Este objeto não tem uma propriedade chamada 'hasOwnProperty'.
O 'hasOwnProperty' é uma propriedade própria do 'Object.prototype'. Então o objeto herda 'hasOwnProperty' de 'Objetc.prototype'.
O 'Object.prototype' tem null como seu protótipo.
A forma de acessar uma propriedade do objeto atual sem atravessar todas a sua cadeia de protótipo é usada com 'hasOwnProprty'.
Como dito anteriormente todos objetos herdam esse método de 'Objetc.prototype'.

```Javascript
{
var obj = { a: 1 };

// obj --> Object.prototype --> null
const proto = Object.getPrototypeOf(obj);

console.log(proto);
console.log(Object.keys(proto));
console.log(Object.getOwnPropertyNames(proto));

console.log(obj.hasOwnProperty("a"));
// Ou
console.log(Object.prototype.hasOwnProperty.call(obj, "a"));

}
```

## Proto Array

Arrays herdam de 'Array.prototype' que tem os métodos como indexOf, forEach, e etc.
A cadeia de protótipo se parece com:

```Javascript
{
  var array = ["yo", "whats`up", "?"];

  // a --> Array.prototipe --> Object.prototype --> null
  const proto = Object.getPrototypeOf(array);

  console.log(Object.keys(proto));
  console.log(Object.getOwnPropertyNames(proto));
}
```

## Proto Functions

Funções herdam de 'Function.prototype' que tem métodos como call, bind e etc.

```Javascript
{
function fn() {
return 2;
}

// f --> Function.prototype --> Object.prototype --> null
const proto = Object.getPrototypeOf(fn());

console.log(Object.keys(proto));
console.log(Object.getOwnPropertyNames(proto));
}
```
