import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, RadioGroup, Select, SelectItem, Radio, Divider } from "@heroui/react";


const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
]

const specialty = [
    { label: "Cardiologist", value: "cardiologist" },
    { label: "Dermatologist", value: "dermatologist" },
    { label: "Neurologist", value: "neurologist" },
    { label: "Pediatrician", value: "pediatrician" },
    { label: "Orthopedist", value: "orthopedist" },
    { label: "Gynecologist", value: "gynecologist" },
    { label: "General Physician", value: "general_physician" },
    { label: "Psychiatrist", value: "psychiatrist" },
    { label: "ENT Specialist", value: "ent_specialist" },
    { label: "Oncologist", value: "oncologist" },
    { label: "Urologist", value: "urologist" },
    { label: "Ophthalmologist", value: "ophthalmologist" },
    { label: "Radiologist", value: "radiologist" },
    { label: "Anesthesiologist", value: "anesthesiologist" },
    { label: "Gastroenterologist", value: "gastroenterologist" },
]

const experience = [
    { label: "1-5 years", value: "1-5" },
    { label: "5-10 years", value: "5-10" },
    { label: "10-15 years", value: "10-15" },
    { label: "15+ years", value: "15+" },
]

const rating = [
    { value: "4.5+", label: "4.5+ Stars" },
    { value: "4.0+", label: "4.0+ Stars" },
    { value: "3.5+", label: "3.5+ Stars" },
    { value: "3.0+", label: "3.0+ Stars" }
];

const consultationType = [
    { value: "video", label: "Video Consultation" },
    { value: "audio", label: "Audio Consultation" },
    { value: "inperson", label: "In-Person Visit" },
    { value: "chat", label: "Text Chat" }
];

const DoctorFilters = () => {
    return (
        <Card className='flex-1 w-full shadow-lg rounded-lg'>
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 bg-white p-4 rounded-t-lg">
                <h2 className='text-lg font-semibold text-primary'>Search Filters</h2>
                <p className="underline text-primary cursor-pointer hover:opacity-80">Clear All</p>
            </CardHeader>
            <Divider className="w-[90%] mx-auto bg-primary"/>
            <CardBody className='text-primary flex flex-col gap-4 p-4'>
                <div>
                    <Input
                        label='Search Doctors'
                    />
                </div>
                <div>
                    <Checkbox color='primary' classNames={{ label: 'text-primary' }}>PMDC Verified</Checkbox>
                </div>
                <div>
                    <Autocomplete label='Specialty'>
                        {specialty.map((item) => (
                            <AutocompleteItem
                                key={item.value}
                            >
                                {item.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>
                <div>
                    <RadioGroup label="Gender" orientation="horizontal">
                        {gender.map((item) => (
                            <Radio
                                color="primary"
                                classNames={{ label: 'text-primary' }}
                                key={item.value}
                                value={item.value}
                            >{item.label}</Radio>
                        ))}
                    </RadioGroup>
                </div>
                <div>
                    <Select label='Experience'>
                        {experience.map((item) => (
                            <SelectItem
                                key={item.value}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select label='Rating'>
                        {rating.map((item) => (
                            <SelectItem
                                key={item.value}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select label='Consultation Type'>
                        {consultationType.map((item) => (
                            <SelectItem
                                key={item.value}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </CardBody>
            <Divider className="w-[90%] mx-auto bg-primary"/>
            <CardFooter className='flex justify-end p-4'>
                <Button color="primary" className='w-full'>
                    Apply Filters
                </Button>
            </CardFooter>
        </Card>
    )
}

export default DoctorFilters