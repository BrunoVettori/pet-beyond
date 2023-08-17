import prisma from "@database/Prisma";

const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

async function main() {
  for (let index = 0; index < estados.length; index++) {
    const conta = await prisma.uf.create({
      data: { uf: estados[index] },
    });
  }

  prisma.$disconnect();
}

main();
