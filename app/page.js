'use client'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Modal from '@mui/material/Modal';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { useState, useEffect } from 'react';


function toTitleCase(str) {
    return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function pickfrom(list) {
  return list[Math.floor(Math.random()*list.length)];
}



const adjectives = [
'Little',
'Big',
'Young',
'Old',
'Bold',
'Ramish',
'Lang',
'Muckle-Mouthed',
'Sneaky',
'Stubborn',
'Devious',
'Dim',
'Unlucky',
'Boastful',
'Foolish',
'Callous',
'Rude',
'Vain',
'Idle',
'Cowardly',
'Nasty',
'Silly',
'Mad',
'Wee',
'Black',
'Bloody',
'Lucky',
'Red'
];

const titles = {
  'm': [
    'Sir',
    'Lord',
    'Captain',
    'Squire',
    'Chief'
  ],
  'f': [
    'Lady',
    'Dame',
    'Miss',
    'Madam'
  ]
}

const surnames = [
'Archbold',
'Armstrong',
'Beattie',
'Bell',
'Burns',
'Carleton',
'Carlisle',
'Carnaby',
'Carrs',
'Carruthers',
'Chamberlain',
'Charlton',
'Collingwood',
'Crisp',
'Crozier',
'Cuthbert',
'Hume',
'Watson',
'Wilson',
'Woodrington',
'Young',
'Dacre',
'Davison',
'Dixon',
'Dodd',
'Douglas',
'Dunne',
'Elliot',
'Fenwick',
'Forster',
'Graham',
'Gray',
'Hall',
'Hedley',
'Henderson',
'Heron',
'Hetherington',
'Irvine',
'Irving',
'Johnstone',
'Kerr',
'Laidlaw',
'Little',
'Lowther',
'Maxwell',
'Milburn',
'Musgrove',
'Nixon',
'Noble',
'Ogle',
'Oliver',
'Potts',
'Pringle',
'Wake',
'Radcliffe',
'Reade',
'Ridley',
'Robson',
'Routledge',
'Rutherford',
'Salkeld',
'Scott',
'Selby',
'Shaftoe',
'Storey',
'Simpson',
'Tait',
'Taylor',
'Trotter',
'Turnbull'
];


export default function Home() {
  const [disabled, setDisabled] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [dadsName, setDadsName] = useState('');
  const [grandadsName, setGrandadsName] = useState('');
  const [profession, setProfession] = useState('');
  const [town, setTown] = useState('');
  const [lack, setLack] = useState('');
  const [gender, setGender] = useState('m');
  const [reiverName, setReiverName] = useState('');

  useEffect(() => {
    if (firstName && dadsName && grandadsName && profession && town && lack && gender) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, dadsName, grandadsName, profession, town, lack, gender]);

  const timer = ms => new Promise(res => setTimeout(res, ms))
  async function makeNames(event) {
    event.preventDefault();

    for (var i = 5; i < 20; i++) {
      makeName()
      await timer(30 * i); // then the created Promise can be awaited
    }
  }
  function makeName() {
    let name2;

    const r = Math.random();
    if (r<0.3) {
      name2 = toTitleCase(firstName);
    } else {

      name2 = toTitleCase(firstName.replace(/(^.*?[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ].*[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]).*/,'$1'));
      if (name2 !== "John") {
        name2 = name2.replace(/o/g, 'a');
      }
      name2 = name2.replace(/[aeiou]([bcdfghjklmnpqrstvwxz])$/,'$&$1') + 'ie';
      
    }
    let adjective;
    if (Math.random() < 0.2) {
      adjective = '';
    } else {
      if (Math.random() < 5/8) {
        adjective = pickfrom(adjectives);
      } else {
        adjective = toTitleCase(lack) + 'less';
      }
    }

    let title;
    if (Math.random() < 0.2) {
      title = '';

    } else {
      if (Math.random() < 5/8) {
        title = pickfrom(titles[gender]);
      } else {
        if (Math.random() < 2/3) {
          title = toTitleCase(dadsName) + "'s";
        } else {
          title = toTitleCase(grandadsName) + "'s " + toTitleCase(dadsName) + "'s";
        }
      }
    }

    let surname;
    if (Math.random()<0.5) {
      surname = pickfrom(surnames)
    } else {
      if (Math.random()<0.5) {
        surname = 'the ' + toTitleCase(profession);
      } else {
        surname = "o'" + toTitleCase(town);
      }
    }
    setReiverName((adjective +' '+ title + ' '+ name2 +' '+ surname).replace(/\s\s*/g,' '))


  }

  return (
    <Paper elevation={3} sx={{p:3, maxWidth:'600px', width:'80%', marginLeft:'auto', marginRight: 'auto', marginTop:0, marginBottom:0}}>
      <Typography variant='h1'>Reiver Namer</Typography>
      <form onSubmit={makeNames}>
      <Stack spacing={2}>

        <TextField onChange={(e)=>setFirstName(e.target.value)} label="First name" helperText="One syllable version only" variant="filled" />
        <TextField onChange={(e)=>setDadsName(e.target.value)} label="Dad's name" helperText="Your Dad's first name" variant="filled" />
        <TextField onChange={(e)=>setGrandadsName(e.target.value)} label="Grandad's name" helperText="Your paternal grandfather's first name" variant="filled" />
        <TextField onChange={(e)=>setProfession(e.target.value)} label="Profession" helperText="Your profession" variant="filled" />
        <TextField onChange={(e)=>setTown(e.target.value)} label="Town" helperText="Your town of birth" variant="filled" />
        <TextField onChange={(e)=>setLack(e.target.value)} label="Thing you want" helperText="A one-word thing you'd like to own" variant="filled" />
        <FormControl fullWidth 
            variant='filled'
        >
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            label="Gender"
            onChange={(e)=>setGender(e.target.value)}
          >
            <MenuItem value={'m'}>Male</MenuItem>
            <MenuItem value={'f'}>Female</MenuItem>
          </Select>
          <FormHelperText>Your gender</FormHelperText>
        </FormControl>
        <Button variant='contained' disabled={disabled} type='submit'>Go!</Button>
      </Stack>
      </form>
    {(reiverName? <Modal
        open={!!reiverName}
        onClose={()=>setReiverName('')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Card sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height:'400px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant='h3'>Your Reiver Name is...</Typography>
        <Typography variant='h4' sx={{p:6, textAlign: 'center'}}>{reiverName}</Typography>
      </Card>

      </Modal>
      :'')
    }
    </Paper>
  )
}
