import { useIsMobile } from "@/hooks/use-mobile";
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardFooter, Checkbox, Input, RadioGroup, Select, SelectItem, Radio, Divider, AccordionItem, Accordion } from "@heroui/react";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import type {Selection} from "@heroui/react";


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
    const isMobile = useIsMobile();
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["filters"]));

    useEffect(() => {
        if (isMobile) {
            setSelectedKeys(new Set());
        } else {
            setSelectedKeys(new Set(['filters']));
        }
    }, [isMobile]);

    return (
        <Card className='flex-1 w-full shadow-lg rounded-lg p-2'>
            <CardBody className='text-primary flex flex-col gap-4'>
            <Accordion selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
                <AccordionItem
                    key='filters'
                    aria-label="Filters"
                    title="Filters"
                    classNames={{
                        title: 'text-primary text-2xl font-semibold',
                        indicator: 'text-primary'
                    }}
                    startContent={<Filter className="text-primary" />}
                    isCompact={true}
                >
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
                    <Divider className="w-[90%] mx-auto bg-primary" />
                    <CardFooter className='flex justify-end p-4'>
                        <Button color="primary" className='w-full'>
                            Apply Filters
                        </Button>
                    </CardFooter>
                </AccordionItem>
            </Accordion>
                    </CardBody>
        </Card>
    )
}

export default DoctorFilters