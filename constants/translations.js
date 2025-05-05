import React, { createContext, useState, useContext } from 'react';
import * as Localization from 'react-native-localize';
import { I18n } from 'i18n-js';

const translations = {
  es: {
    tittleTextDevDialog: 'DESARROLLO',
    textDevDialog_one: 'Videojuego desarrollado y elaborado por el equipo 7 de proyecto integrador 2',
    textDevDialog_two: 'Att: Cesar Vielmas',
    listApartsTittle_one:'AJUSTES',
    listApartsTittle_one_text_one:'AJUSTES DE AUDIO',
    listApartsTittle_one_text_two:'IDIOMA',
    listApartsTittle_two:'NOTICIAS',
    listApartsTittle_two_text_one:'Sin Novedades...',
    listApartsTittle_two_text_two:'Noticias',
    listApartsTittle_two_new_one_tittle:'!Nueva actualizacion 1.0.1!, la cual agrega 2 nuevos personajes en la tienda...',
    listApartsTittle_two_new_one_time:"Hace 2 dias",
    listApartsTittle_two_new_one_optionalButton_one:'Leer',
    listApartsTittle_two_new_one_optionalButton_two_text:'Ver',
    listApartsTittle_two_new_two_tittle:'Nuevo mapa añadido, en la nueva version se añadio un nuevo mapa...',
    listApartsTittle_two_new_two_time:"Hace 1 mes",
    listApartsTittle_two_new_two_optionalButton_one:'Leer',
    listApartsTittle_two_new_two_optionalButton_two_text:'Ver',
    listApartsTittle_two_new_three_tittle:'Correccion de errores y parche en los personajes del nuevo mapa...',
    listApartsTittle_two_new_three_time:"Hace 2 horas",
    listApartsTittle_two_new_three_optionalButton_one:'Leer',
    listApartsTittle_two_new_three_optionalButton_two_text:'Ver',
    listApartsTittle_two_new_type_one:'Actualizaciones',
    listApartsTittle_two_new_type_two:'Personajes',
    listApartsTittle_two_new_type_three:'Niveles',
    textDialogAccount:'CUENTA',
    textButtonDialogSettings:'Mas Ajustes',
    textButtonDialogNew:'Ver Noticias',
    textProfileVoidAccount:'Borrar Datos',
    textProfileDeleteAccount:'Eliminar Cuenta',
    textTittleSecondDialogChangeImage:'AVATAR',
    textTittleSecondDialogDelete:'ELIMINAR',
    textTittleSecondDialogDelete_text_one:'¿ESTA SEGURO DE ELIMINAR LOS DATOS?',
    textTittleSecondDialogDelete_text_second:'¿ESTA SEGURO DE ELIMINAR LA CUENTA?',
    textTittleSecondDialogChangeName:'NOMBRE',
    textTittleSecondDialogName:'CAMBIO DE NOMBRE',
    textPlaceholderDialogChangeName:'Escriba su nombre...',
    acceptButton:'Aceptar',
    yesText:'Si',
    notText:'No',
    homeApartGame_one:"HEROE",
    homeApartGame_two:"MAPA",
    homeApartGame_tree:"MUSICA",
    homeApartGame_two_map_one:"SUMA",
    homeApartGame_two_map_two:"RESTA",
    homeApartGame_two_map_tree:"MULTIPLICACION",
    homeApartGame_two_map_forth:"DIVISION",
    homeApartDialog_one:"COMPRAR",
    homeApartDialog_two:"BLOQUEADO",
    homeApartDialog_two_text:"NECESITA COMPLETAR EL MAPA ANTERIOR PARA ACCEDER A UNO NUEVO",
    homeApartDialog_one_tittle_text:"¿DESEA COMPRAR DICHO ARTICULO?",
    homeApartDialog_one_button_text_yes:"Si",
    homeApartDialog_one_button_text_no:"No",
    homeApartSecondDialogError_tittle:"ERROR",
    homeApartSecondDialogError_text_one:"PARECE QUE NO CUENTA CON LAS MONEDAS SUFICIENTES",
    homeApartSecondDialogError_text_two:"PARECE QUE NO CUENTA CON LAS ESTRELLAS SUFICIENTES",
  },
  en: {
    tittleTextDevDialog: 'DEVELOPMENT',
    textDevDialog_one: 'Videogame developed and created by Team 7 of Integrative Project 2',
    textDevDialog_two: 'Sincerely: Cesar Vielmas',
    listApartsTittle_one: 'SETTINGS',
    listApartsTittle_one_text_one: 'AUDIO SETTINGS',
    listApartsTittle_one_text_two: 'LANGUAGE',
    listApartsTittle_two: 'NEWS',
    listApartsTittle_two_text_one: 'No News...',
    listApartsTittle_two_text_two: 'News',
    listApartsTittle_two_new_one_tittle: 'New update 1.0.1! Two new characters have been added to the store...',
    listApartsTittle_two_new_one_time: '2 days ago',
    listApartsTittle_two_new_one_optionalButton_one: 'Read',
    listApartsTittle_two_new_one_optionalButton_two_text: 'View',
    listApartsTittle_two_new_two_tittle: 'New map added, a new map has been included in the latest version...',
    listApartsTittle_two_new_two_time: '1 month ago',
    listApartsTittle_two_new_two_optionalButton_one: 'Read',
    listApartsTittle_two_new_two_optionalButton_two_text: 'View',
    listApartsTittle_two_new_three_tittle: 'Bug fixes and character patching in the new map...',
    listApartsTittle_two_new_three_time: '2 hours ago',
    listApartsTittle_two_new_three_optionalButton_one: 'Read',
    listApartsTittle_two_new_three_optionalButton_two_text: 'View',
    listApartsTittle_two_new_type_one: 'Updates',
    listApartsTittle_two_new_type_two: 'Characters',
    listApartsTittle_two_new_type_three: 'Levels',
    textButtonDialogSettings: 'More Settings',
    textButtonDialogNew: 'See News',
    textDialogAccount:'ACCOUNT',
    textProfileVoidAccount:'Delete Data',
    textProfileDeleteAccount:'Delete Account',
    textTittleSecondDialogChangeImage:'AVATAR',
    textTittleSecondDialogDelete:'DELETE',
    textTittleSecondDialogDelete_text_one:'ARE YOU SURE YOU WANT TO DELETE THE DATA?',
    textTittleSecondDialogDelete_text_second:'ARE YOU SURE YOU WANT TO DELETE THE ACCOUNT?',
    textTittleSecondDialogChangeName:'NAME',
    textTittleSecondDialogName:'NAME CHANGE',
    textPlaceholderDialogChangeName:'Write your name...',
    acceptButton:'Accept',
    yesText:'Yes',
    notText:'No',
    homeApartGame_one:"HEROE",
    homeApartGame_two:"MAP",
    homeApartGame_tree:"MUSIC",
    homeApartGame_two_map_one:"ADDITION",
    homeApartGame_two_map_two:"SUBSTRACTION",
    homeApartGame_two_map_tree:"MULTIPLICATION",
    homeApartGame_two_map_forth:"DIVISION",
    homeApartDialog_one:"PURCHASE",
    homeApartDialog_two:"BLOCKED",
    homeApartDialog_two_text:"YOU NEED TO COMPLETE THE PREVIOUS MAP TO ACCESS A NEW ONE",
    homeApartDialog_one_tittle_text:"DO YOU WANT TO BUY THIS ITEM?",
    homeApartDialog_one_button_text_yes:"Yes",
    homeApartDialog_one_button_text_no:"No",
    homeApartSecondDialogError_tittle:"ERROR",
    homeApartSecondDialogError_text_one:"IT SEEMS THAT YOU DO NOT HAVE ENOUGH COINS",
    homeApartSecondDialogError_text_two:"IT SEEMS THAT IT DOESN'T HAVE ENOUGH STARS",
  },
};


const i18n = new I18n(translations);

const supportedLanguages = ['es', 'en'];
const locales = Localization.getLocales();
const deviceLanguage = locales[0]?.languageCode || 'es';

i18n.locale = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'es';
i18n.enableFallback = true;

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale);

  const changeLanguage = (newLanguage) => {
    if (supportedLanguages.includes(newLanguage)) {
      i18n.locale = newLanguage; 
      setLanguage(newLanguage);
    }
  };
  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage,
      t: (key) => i18n.t(key) 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
