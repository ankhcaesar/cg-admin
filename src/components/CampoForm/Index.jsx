  import { useEffect, useState } from "react";
  import styles from "./CampoForm.module.css";

  function CampoForm({
    label,
    name,
    value,
    onChange,
    error,
    type,
    ancho = "100%",
    checked,
    rows = 3,
    options,
    required,
    minLength,
    title
  }) {
    if (type === "checkbox") {
      return (
        <div className={styles.campoForm__checkboxContainer} style={{ width: ancho }}>
          <label className={styles.campoForm__checkboxLabel}>
            <input
              type="checkbox"

              name={name}
              checked={checked}
              onChange={onChange}
              required={required}
              title={title}
              onInvalid={(e) => {
                e.target.setCustomValidity(title || "error");
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
            />
            {label}
          </label>
        </div>
      );
    }

    if (type === "textarea") {
      return (
        <label className={styles.campoForm__label} style={{ width: ancho }}>
          {label}
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            className={styles.input}
            required={required}
            title={title}
            onInvalid={(e) => {
              e.target.setCustomValidity(title || "error");
            }}
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
          />
          {error && <div className={styles.campoForm__error}>{error}</div>}
        </label>
      );
    }

    if (type === "select") {
      return (
        <label className={styles.campoForm__label} style={{ width: ancho }}>
          {label}
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={styles.input}
            required={required}
            title={title}
            onInvalid={(e) => {
              e.target.setCustomValidity(title || "error");
            }}
            onInput={(e) => {
              e.target.setCustomValidity("");
            }}
          >
            <option value="">-- Elegir --</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>

            ))}
          </select>
          {error && <div className={styles.campoForm__error}>{error}</div>}
        </label>
      );
    }

    if (type === "autocomplete") {
      const [showOptions, setShowOptions] = useState(false);

      return (
        <div className={styles.campoForm__autocomplete} style={{ width: ancho, position: "relative" }}>
          <label className={styles.campoForm__label}>
            {label}
            <input
              type="text"
              name={name}
              value={value}
              onChange={(e) => {
                onChange(e);
                setShowOptions(true);
              }}
              required={required}
              title={title}
              onInvalid={(e) => {
                e.target.setCustomValidity(title || "error");
              }}
              onInput={(e) => {
                e.target.setCustomValidity("");
              }}
              onBlur={() => setTimeout(() => setShowOptions(false), 150)}
              className={styles.input}
              autoComplete="off"
            />
          </label>
          {showOptions && options?.length > 0 && (
            <ul className={styles.campoForm__sugerencias}>
              {options.map((opt) => (
                <li
                  key={opt.id}
                  onClick={() => {
                    const fakeEvent = { target: { name, value: opt.nombre, type: "text" } };
                    onChange(fakeEvent);
                    setShowOptions(false);
                  }}
                >
                  {opt.nombre}
                </li>
              ))}
            </ul>
          )}
          {error && <div className={styles.campoForm__error}>{error}</div>}
        </div>
      );
    }

    return (
      <label className={styles.campoForm__label} style={{ width: ancho }}>
        {label}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.input}
          required={required}
          title={title}
          onInvalid={(e) => {
            e.target.setCustomValidity(title || "Error");
          }}
          onInput={(e) => {
            e.target.setCustomValidity("");
          }}
        />
        {error && <div className={styles.campoForm__error}>{error}</div>}
      </label>
    );
  }
  export default CampoForm