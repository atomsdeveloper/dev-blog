"use client";

// Icons
import { BugIcon } from "lucide-react";

// Components
import { Button } from "../Button";
import { InputCheckbox } from "../InputCheckbox";
import { InputText } from "../InputText";

export function Form() {
  return (
    <form action="" className="mb-6">
      <div className="py-16 text-6xl">
        {/* Buttons */}
        <Button variant="default" size="sm" type="submit">
          <BugIcon />
          Button 0
        </Button>
        <Button variant="ghost" size="md" type="submit">
          <BugIcon />
          Button 1
        </Button>
        <Button variant="danger" size="lg" type="submit" disabled>
          <BugIcon />
          Button 2
        </Button>

        {/* Input Text Area */}
        <InputText
          labelText="Write your post"
          type="text"
          placeholder="Enter text"
        />

        <InputText
          labelText=""
          type="text"
          placeholder="Enter other text"
          disabled
        />

        {/* Input Checkbox */}
        <InputCheckbox type="checkbox" labelText="Checkbox" />
      </div>

      <div className="mt-2">
        <Button variant="default" size="md" type="submit" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
}
