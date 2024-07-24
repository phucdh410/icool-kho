import { CENTRAL_KITCHEN, CENTRAL_WAREHOUSE } from "src/configs/constant";

export const isSuccess = (res) => {
  if (res?.exitcode)
    return (
      parseInt(res.exitcode) === 200 ||
      parseInt(res.exitcode) === 201 ||
      parseInt(res.exitcode) === 304
    );

  return !!res;
};

export const isCentral = (code) => {
  return code === CENTRAL_WAREHOUSE || code === CENTRAL_KITCHEN;
};

export const getShortNameStore = (name) => {
  let copyName = name;

  if (name.startsWith("ICOOL")) {
    copyName = name.replace("ICOOL", "").trim();
  }

  const arrCharacter = copyName.split(" ");

  let shortName = "CN ";

  arrCharacter.forEach((character) => {
    shortName += character[0];
  });

  return shortName;
};
