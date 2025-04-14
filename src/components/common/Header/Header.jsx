"use client";
import styleGlobal from "../../../styles/global.module.css";
import SearchInput from "../SearchInput/SearchInput";

export default function HeaderMain({ activeTab, closeSearch, openSearch, onSearch, inputRef }) {

  return (
    <>
      
      <header className="hero-main transition-all duration-300 w-full z-40">

        <section className="hero-primary relative flex justify-between items-center bg-color-primario w-full py-4 overflow-hidden">

          <div className={`hero-content relative flex justify-between items-center gap-2 ${styleGlobal.containerContent} transition-transform duration-300 ease-in-out`}>

            {/* Boton para cerrar la busqueda */}
            <button
              className={`close-search absolute top-1 left-0 transition-all duration-300 ease-in-out z-40 ${activeTab === "Buscar" ? "translate-x-0 opacity-100 -left-2" : "translate-x-full opacity-0"}`}
              onClick={(e) => {
                e.stopPropagation();
                closeSearch();
              }}
            >
              <box-icon name="chevron-left"></box-icon>
            </button>
            {/* Logo se oculta cuando la busqueda esta activa */}

            <a
              href="#"
              className={`hero-logo text-color-secundario no-underline font-medium tracking-widest transition-opacity duration-300 ease-in-out ${
                activeTab === "Buscar"
                  ? "opacity-0 max-w-0"
                  : "opacity-100"
              }`}
            >
              BubbleStore
            </a>

            <SearchInput
              isActiveInput={activeTab}
              openInput={openSearch}
              inputRef={inputRef}
              onSearch={onSearch}
            />
            
          </div>

        </section>

      </header>

    </>
  );
};