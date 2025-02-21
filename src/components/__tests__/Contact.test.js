import { render,screen } from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom"

test("Should load",()=>{
    render(<Contact/>);
    const heading = screen.getByRole("a");
    expect(heading).toBeInTheDocument(); 
})