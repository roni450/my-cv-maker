import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import {
  Box, Heading, Input, Button, VStack, Textarea, Text, Flex, Tag, HStack, useToast, IconButton, Avatar, useColorMode, SimpleGrid
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function CVForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [summary, setSummary] = useState('');
  const [educationInput, setEducationInput] = useState('');
  const [educationList, setEducationList] = useState([]);
  const [experienceInput, setExperienceInput] = useState('');
  const [experienceList, setExperienceList] = useState([]);
  const [skillsInput, setSkillsInput] = useState('');
  const [skillsList, setSkillsList] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [languages, setLanguages] = useState([]);
  const [certInput, setCertInput] = useState('');
  const [certs, setCerts] = useState([]);
  const [awardInput, setAwardInput] = useState('');
  const [awards, setAwards] = useState([]);
  const [refInput, setRefInput] = useState('');
  const [references, setReferences] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const fileInputRef = useRef();

  // Template selection
  const [template, setTemplate] = useState('australia'); // options: australia, newzealand, europe

  // Template display names
  const templateOptions = [
    { value: 'australia', label: 'Australia CV' },
    { value: 'newzealand', label: 'New Zealand CV' },
    { value: 'europe', label: 'Europe CV' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 15;
    // Profile photo
    if (photoURL) {
      doc.addImage(photoURL, 'JPEG', 150, 10, 40, 40);
    }
    doc.setFontSize(18);
    doc.text(name, 10, y);
    doc.setFontSize(12);
    y += 10;
    doc.text(`Email: ${email}`, 10, y);
    y += 8;
    doc.text(`Phone: ${phone}`, 10, y);
    y += 8;
    doc.text(`Address: ${address}`, 10, y);
    y += 8;
    if (linkedin) { doc.text(`LinkedIn: ${linkedin}`, 10, y); y += 8; }
    if (github) { doc.text(`GitHub: ${github}`, 10, y); y += 8; }
    if (portfolio) { doc.text(`Portfolio: ${portfolio}`, 10, y); y += 8; }
    doc.text('Summary:', 10, y + 2);
    y += 8;
    doc.text(summary, 10, y + 6);
    y += 14;
    doc.text('Education:', 10, y);
    educationList.forEach((edu, i) => doc.text(`- ${edu}`, 14, y + 8 + i * 8));
    y = y + 8 + educationList.length * 8;
    doc.text('Experience:', 10, y);
    experienceList.forEach((exp, i) => doc.text(`- ${exp}`, 14, y + 8 + i * 8));
    y = y + 8 + experienceList.length * 8;
    doc.text('Skills:', 10, y);
    doc.text(skillsList.join(', '), 14, y + 8);
    y = y + 16;
    doc.text('Languages:', 10, y);
    doc.text(languages.join(', '), 14, y + 8);
    y = y + 16;
    doc.text('Certifications:', 10, y);
    certs.forEach((c, i) => doc.text(`- ${c}`, 14, y + 8 + i * 8));
    y = y + 8 + certs.length * 8;
    doc.text('Awards:', 10, y);
    awards.forEach((a, i) => doc.text(`- ${a}`, 14, y + 8 + i * 8));
    y = y + 8 + awards.length * 8;
    doc.text('References:', 10, y);
    references.forEach((r, i) => doc.text(`- ${r}`, 14, y + 8 + i * 8));
    doc.save('cv.pdf');
  };

  // Handlers for new fields
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoURL(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      setLanguages([...languages, languageInput.trim()]);
      setLanguageInput('');
    }
  };
  const handleAddCert = () => {
    if (certInput.trim()) {
      setCerts([...certs, certInput.trim()]);
      setCertInput('');
    }
  };
  const handleAddAward = () => {
    if (awardInput.trim()) {
      setAwards([...awards, awardInput.trim()]);
      setAwardInput('');
    }
  };
  const handleAddReference = () => {
    if (refInput.trim()) {
      setReferences([...references, refInput.trim()]);
      setRefInput('');
    }
  };


  const handleAddEducation = () => {
    if (educationInput.trim()) {
      setEducationList([...educationList, educationInput.trim()]);
      setEducationInput('');
    }
  };
  const handleAddExperience = () => {
    if (experienceInput.trim()) {
      setExperienceList([...experienceList, experienceInput.trim()]);
      setExperienceInput('');
    }
  };
  const handleAddSkill = () => {
    if (skillsInput.trim()) {
      setSkillsList([...skillsList, skillsInput.trim()]);
      setSkillsInput('');
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient="linear(to-br, teal.50, blue.100, teal.200)">
      <Box bg="white" p={8} rounded="2xl" shadow="2xl" w={{ base: '100%', md: '1100px' }}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          {/* Form Section */}
          <Box flex={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Heading size="md" color="teal.600">CV Builder</Heading>
              <HStack>
                <IconButton icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} aria-label="Toggle theme" onClick={toggleColorMode} size="sm" />
                <Button colorScheme="red" onClick={handleLogout} size="sm">
                  Log Out
                </Button>
              </HStack>
            </Box>
            {/* Template Selector */}
            <HStack mb={4}>
              <Text fontWeight="bold">CV Template:</Text>
              {templateOptions.map(opt => (
                <Button
                  key={opt.value}
                  size="sm"
                  colorScheme={template === opt.value ? 'teal' : 'gray'}
                  variant={template === opt.value ? 'solid' : 'outline'}
                  onClick={() => setTemplate(opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </HStack>
            <VStack spacing={4} align="stretch">
              {/* Profile Photo Upload */}
              <HStack>
                <Avatar size="lg" src={photoURL} name={name} />
                <Button onClick={() => fileInputRef.current.click()} colorScheme="teal" variant="outline" size="sm">Upload Photo</Button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoChange} />
              </HStack>
              <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
              <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
              <Textarea placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />

              {/* Social Links */}
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={2}>
                <Input leftIcon={<FaLinkedin />} placeholder="LinkedIn URL" value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                <Input leftIcon={<FaGithub />} placeholder="GitHub URL" value={github} onChange={e => setGithub(e.target.value)} />
                <Input leftIcon={<FaGlobe />} placeholder="Portfolio URL" value={portfolio} onChange={e => setPortfolio(e.target.value)} />
              </SimpleGrid>

              {/* Education List */}
              <HStack>
                <Input flex={1} placeholder="Add Education (e.g. BSc in CSE, DU 2024)" value={educationInput} onChange={e => setEducationInput(e.target.value)} />
                <Button colorScheme="teal" onClick={handleAddEducation}>Add</Button>
              </HStack>
              <VStack align="start" spacing={1}>
                {educationList.map((edu, idx) => <Tag key={idx} colorScheme="teal">{edu}</Tag>)}
              </VStack>

              {/* Experience List */}
              <HStack>
                <Input flex={1} placeholder="Add Experience (e.g. Software Engineer at ABC)" value={experienceInput} onChange={e => setExperienceInput(e.target.value)} />
                <Button colorScheme="blue" onClick={handleAddExperience}>Add</Button>
              </HStack>
              <VStack align="start" spacing={1}>
                {experienceList.map((exp, idx) => <Tag key={idx} colorScheme="blue">{exp}</Tag>)}
              </VStack>

              {/* Skills List */}
              <HStack>
                <Input flex={1} placeholder="Add Skill (e.g. React, Python)" value={skillsInput} onChange={e => setSkillsInput(e.target.value)} />
                <Button colorScheme="purple" onClick={handleAddSkill}>Add</Button>
              </HStack>
              <VStack align="start" spacing={1}>
                <HStack wrap="wrap">
                  {skillsList.map((skill, idx) => <Tag key={idx} colorScheme="purple">{skill}</Tag>)}
                </HStack>
              </VStack>

              {/* Languages */}
              <HStack>
                <Input flex={1} placeholder="Add Language (e.g. English)" value={languageInput} onChange={e => setLanguageInput(e.target.value)} />
                <Button colorScheme="green" onClick={handleAddLanguage}>Add</Button>
              </HStack>
              <VStack align="start" spacing={1}>
                <HStack wrap="wrap">{languages.map((lang, idx) => <Tag key={idx} colorScheme="green">{lang}</Tag>)}</HStack>
              </VStack>

              {/* Certifications */}
              <HStack>
                <Input flex={1} placeholder="Add Certification" value={certInput} onChange={e => setCertInput(e.target.value)} />
                <Button colorScheme="orange" onClick={handleAddCert}>Add</Button>
              </HStack>
              <VStack align="start" spacing={1}>
                {certs.map((cert, idx) => <Tag key={idx} colorScheme="orange">{cert}</Tag>)}
              </VStack>

              {/* Awards */}
              <HStack>
                <Input flex={1} placeholder="Add Award" value={awardInput} onChange={e => setAwardInput(e.target.value)} />
                <Button colorScheme="yellow" onClick={handleAddAward}>Add</Button>
              </HStack>
              <VStack align="start" spacing={1}>
                {awards.map((award, idx) => <Tag key={idx} colorScheme="yellow">{award}</Tag>)}
              </VStack>

              {/* References */}
              <HStack>
                <Input flex={1} placeholder="Add Reference" value={refInput} onChange={e => setRefInput(e.target.value)} />
                <Button colorScheme="gray" onClick={handleAddReference}>Add</Button>
              </HStack>
              <VStack align="start" spacing={1}>
                {references.map((ref, idx) => <Tag key={idx} colorScheme="gray">{ref}</Tag>)}
              </VStack>

              <Button colorScheme="teal" onClick={handleDownloadPDF} w="full">Download PDF</Button>
            </VStack>
          </Box>

          {/* Preview Section */}
          <Box flex={1} bgGradient="linear(to-br, teal.50, blue.50)" p={6} rounded="xl" shadow="md">
            <Heading size="md" mb={2} color="teal.700">CV Preview</Heading>
            {/* Different preview layouts for each template */}
            {template === 'australia' && (
              <>
                <HStack mb={2}>
                  <Avatar size="lg" src={photoURL} name={name} />
                  <Box>
                    <Text fontWeight="bold" fontSize="xl">{name}</Text>
                    <Text color="gray.600">{email}</Text>
                    <Text color="gray.600">{phone}</Text>
                    <Text color="gray.600">{address}</Text>
                  </Box>
                </HStack>
                <HStack spacing={3} mb={2}>
                  {linkedin && <Button as="a" href={linkedin} target="_blank" size="sm" leftIcon={<FaLinkedin />} colorScheme="linkedin" variant="ghost">LinkedIn</Button>}
                  {github && <Button as="a" href={github} target="_blank" size="sm" leftIcon={<FaGithub />} colorScheme="gray" variant="ghost">GitHub</Button>}
                  {portfolio && <Button as="a" href={portfolio} target="_blank" size="sm" leftIcon={<FaGlobe />} colorScheme="teal" variant="ghost">Portfolio</Button>}
                </HStack>
                <Text mt={2}><b>Summary:</b> {summary}</Text>
                <Box mt={2}>
                  <Text fontWeight="bold">Education</Text>
                  <VStack align="start" spacing={1}>{educationList.map((edu, idx) => <Text key={idx}>• {edu}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold">Experience</Text>
                  <VStack align="start" spacing={1}>{experienceList.map((exp, idx) => <Text key={idx}>• {exp}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold">Skills</Text>
                  <HStack wrap="wrap">{skillsList.map((skill, idx) => <Tag key={idx} colorScheme="purple">{skill}</Tag>)}</HStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold">Languages</Text>
                  <HStack wrap="wrap">{languages.map((lang, idx) => <Tag key={idx} colorScheme="green">{lang}</Tag>)}</HStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold">Certifications</Text>
                  <VStack align="start" spacing={1}>{certs.map((cert, idx) => <Text key={idx}>• {cert}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold">Awards</Text>
                  <VStack align="start" spacing={1}>{awards.map((award, idx) => <Text key={idx}>• {award}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold">References</Text>
                  <VStack align="start" spacing={1}>{references.map((ref, idx) => <Text key={idx}>• {ref}</Text>)}</VStack>
                </Box>
              </>
            )}
            {template === 'newzealand' && (
              <>
                <HStack mb={2}>
                  <Avatar size="lg" src={photoURL} name={name} />
                  <Box>
                    <Text fontWeight="bold" fontSize="2xl" color="blue.600">{name}</Text>
                    <Text color="gray.700">{email}</Text>
                    <Text color="gray.700">{phone}</Text>
                    <Text color="gray.700">{address}</Text>
                  </Box>
                </HStack>
                <Text mt={2} fontStyle="italic">{summary}</Text>
                <Box mt={2}>
                  <Text fontWeight="bold" color="blue.600">Professional Experience</Text>
                  <VStack align="start" spacing={1}>{experienceList.map((exp, idx) => <Text key={idx}>• {exp}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="blue.600">Education</Text>
                  <VStack align="start" spacing={1}>{educationList.map((edu, idx) => <Text key={idx}>• {edu}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="blue.600">Skills & Languages</Text>
                  <HStack wrap="wrap">{skillsList.map((skill, idx) => <Tag key={idx} colorScheme="purple">{skill}</Tag>)}{languages.map((lang, idx) => <Tag key={idx} colorScheme="green">{lang}</Tag>)}</HStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="blue.600">Certifications & Awards</Text>
                  <VStack align="start" spacing={1}>{certs.map((cert, idx) => <Text key={idx}>• {cert}</Text>)}{awards.map((award, idx) => <Text key={idx}>• {award}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="blue.600">References</Text>
                  <VStack align="start" spacing={1}>{references.map((ref, idx) => <Text key={idx}>• {ref}</Text>)}</VStack>
                </Box>
                <HStack spacing={3} mt={2}>
                  {linkedin && <Button as="a" href={linkedin} target="_blank" size="sm" leftIcon={<FaLinkedin />} colorScheme="linkedin" variant="ghost">LinkedIn</Button>}
                  {github && <Button as="a" href={github} target="_blank" size="sm" leftIcon={<FaGithub />} colorScheme="gray" variant="ghost">GitHub</Button>}
                  {portfolio && <Button as="a" href={portfolio} target="_blank" size="sm" leftIcon={<FaGlobe />} colorScheme="teal" variant="ghost">Portfolio</Button>}
                </HStack>
              </>
            )}
            {template === 'europe' && (
              <>
                <Box mb={2} textAlign="center">
                  <Avatar size="lg" src={photoURL} name={name} mx="auto" />
                  <Text fontWeight="bold" fontSize="2xl" color="teal.700">{name}</Text>
                  <Text color="gray.600">{email} | {phone} | {address}</Text>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">Profile</Text>
                  <Text>{summary}</Text>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">Education</Text>
                  <VStack align="start" spacing={1}>{educationList.map((edu, idx) => <Text key={idx}>• {edu}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">Work Experience</Text>
                  <VStack align="start" spacing={1}>{experienceList.map((exp, idx) => <Text key={idx}>• {exp}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">Skills</Text>
                  <HStack wrap="wrap">{skillsList.map((skill, idx) => <Tag key={idx} colorScheme="purple">{skill}</Tag>)}</HStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">Languages</Text>
                  <HStack wrap="wrap">{languages.map((lang, idx) => <Tag key={idx} colorScheme="green">{lang}</Tag>)}</HStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">Certifications</Text>
                  <VStack align="start" spacing={1}>{certs.map((cert, idx) => <Text key={idx}>• {cert}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">Awards</Text>
                  <VStack align="start" spacing={1}>{awards.map((award, idx) => <Text key={idx}>• {award}</Text>)}</VStack>
                </Box>
                <Box mt={2}>
                  <Text fontWeight="bold" color="teal.700">References</Text>
                  <VStack align="start" spacing={1}>{references.map((ref, idx) => <Text key={idx}>• {ref}</Text>)}</VStack>
                </Box>
                <HStack spacing={3} mt={2} justify="center">
                  {linkedin && <Button as="a" href={linkedin} target="_blank" size="sm" leftIcon={<FaLinkedin />} colorScheme="linkedin" variant="ghost">LinkedIn</Button>}
                  {github && <Button as="a" href={github} target="_blank" size="sm" leftIcon={<FaGithub />} colorScheme="gray" variant="ghost">GitHub</Button>}
                  {portfolio && <Button as="a" href={portfolio} target="_blank" size="sm" leftIcon={<FaGlobe />} colorScheme="teal" variant="ghost">Portfolio</Button>}
                </HStack>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}