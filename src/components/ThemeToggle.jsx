import { IconButton, Tooltip } from '@mui/material';
import { LightMode as LightIcon, DarkMode as DarkIcon } from '@mui/icons-material';

const ThemeToggle = ({ isDarkTheme, onToggle }) => {
  return (
    <Tooltip title={isDarkTheme ? 'Переключить на светлую тему' : 'Переключить на темную тему'}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        aria-label={isDarkTheme ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '8px',
          padding: '8px'
        }}
      >
        {isDarkTheme ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;